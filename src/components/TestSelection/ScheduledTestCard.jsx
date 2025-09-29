"use client";
import { useEffect, useState } from "react";
import { Users, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
const StudentBatchesDisplay = () => {
  const router = useRouter();
  const [batchData, setBatchData] = useState([]);
  const [studentInfo, setStudentInfo] = useState({ name: "", id: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatchesByStudent = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const studentId = decodedToken.id;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'}/batches/student/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setBatchData(data.batches || []);
          setStudentInfo({
            name: data.studentName,
            id: data.studentId,
          });
        } else {
          setBatchData([]);
        }
      } catch (error) {
        console.error("Failed to fetch student batches:", error);
        setBatchData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBatchesByStudent();
  }, []);

  const handleViewDetails = (batchId) => {
    // Add your navigation logic here
    console.log("View details for batch:", batchId);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Batches</h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">My Batches</h2>
            <p className="text-sm text-gray-600">
              {studentInfo.name && `Welcome, ${studentInfo.name}`}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{batchData.length}</div>
            <div className="text-sm text-gray-600">
              {batchData.length === 1 ? "Batch" : "Batches"}
            </div>
          </div>
        </div>
      </div>

      {/* Batches Table */}
      {batchData.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Batch Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batchData.map((batch, index) => (
                <tr key={batch.batchId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {batch.batchName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {batch.batchId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {batch.no_of_students}
                      </div>
                      <span className="ml-1 text-sm text-gray-500">students</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => router.push(`/batch/${batch.batchId}`)}
                      className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-12 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-gray-400 w-10 h-10" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Batches Found
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            You are not enrolled in any batches yet. Please contact your administrator for enrollment.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentBatchesDisplay;