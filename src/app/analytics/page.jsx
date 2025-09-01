"use client"
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, BookOpen, Award, AlertCircle, Calendar, Target, Brain } from 'lucide-react';
import axios from "axios"
const Page = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review/analytics` , {
          headers:{
            "Authorization" : `Bearer ${localStorage.getItem("authToken")}`
          }
        });
        
        // Mock data for demonstration
        // const mockData = {
        //   "message": "User test analytics retrieved successfully",
        //   "summary": {
        //     "totalTests": 30,
        //     "averageScore": 8.24,
        //     "highestScore": 38.46,
        //     "lowestScore": 0,
        //     "improvementRate": -100
        //   },
        //   "subjectPerformance": {
        //     "Physics": {
        //       "totalQuestions": 64,
        //       "correctAnswers": 0,
        //       "testsCount": 5,
        //       "averageAccuracy": "0.00"
        //     },
        //     "General": {
        //       "totalQuestions": 80,
        //       "correctAnswers": 0,
        //       "testsCount": 5,
        //       "averageAccuracy": "0.00"
        //     }
        //   },
        //   "improvementAreas": {
        //     "weakSubjects": [
        //       { "subject": "Physics", "accuracy": 0, "testsCount": 5 },
        //       { "subject": "General", "accuracy": 0, "testsCount": 5 }
        //     ],
        //     "recommendations": [
        //       "Focus on fundamental concepts as overall performance needs improvement",
        //       "Strengthen Physics fundamentals (current accuracy: 0%)",
        //       "Strengthen General fundamentals (current accuracy: 0%)"
        //     ],
        //     "overallAccuracy": 0
        //   },
        //   "progressTrends": {
        //     "trend": "stable",
        //     "monthlyTrends": [
        //       { "month": "2025-8", "averageScore": 8.235000000000001, "testCount": 30 }
        //     ],
        //     "message": "Your performance is stable, keep practicing to improve"
        //   },
        //   "recentTests": [
        //     { "id": 157, "type": "fulltest", "date": "2025-08-28T09:34:11.000Z", "score": 0 },
        //     { "id": 87, "type": "meTest", "date": "2025-08-28T09:46:30.000Z", "score": 0 },
        //     { "id": 88, "type": "meTest", "date": "2025-08-28T09:51:58.000Z", "score": 0 },
        //     { "id": 89, "type": "meTest", "date": "2025-08-28T09:52:11.000Z", "score": 0 },
        //     { "id": 54, "type": "generate", "date": "2025-08-28T09:53:54.000Z", "score": 0 }
        //   ]
        // };
        
        setTimeout(() => {
          setAnalyticsData(response.data);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading analytics...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const { summary, subjectPerformance, improvementAreas, progressTrends, recentTests } = analyticsData;

  // Prepare chart data
  const subjectData = Object.entries(subjectPerformance).map(([subject, data]) => ({
    subject,
    accuracy: parseFloat(data.averageAccuracy),
    testsCount: data.testsCount,
    totalQuestions: data.totalQuestions,
    correctAnswers: data.correctAnswers
  }));

  const recentTestsData = recentTests.map(test => ({
    ...test,
    date: new Date(test.date).toLocaleDateString(),
    formattedDate: new Date(test.date).toLocaleString()
  }));

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Test Analytics Dashboard</h1>
          </div>
          <p className="text-gray-600">Track your progress in Biology, Chemistry, and Physics</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-3xl font-bold text-gray-900">{summary.totalTests}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-gray-900">{summary.averageScore.toFixed(1)}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Highest Score</p>
                <p className="text-3xl font-bold text-gray-900">{summary.highestScore}</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Improvement Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900">{summary.improvementRate}%</p>
                  {summary.improvementRate >= 0 ? 
                    <TrendingUp className="h-5 w-5 text-green-500" /> : 
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Subject Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Subject Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}${name === 'accuracy' ? '%' : ''}`, 
                    name === 'accuracy' ? 'Accuracy' : 'Tests Count'
                  ]}
                />
                <Bar dataKey="accuracy" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Tests Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Test Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={recentTestsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Score']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={2} dot={{fill: '#8B5CF6'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Subject Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(subjectPerformance).map(([subject, data]) => (
                <div key={subject} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">{subject}</h4>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {data.testsCount} tests
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Questions</p>
                      <p className="font-semibold">{data.totalQuestions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Correct Answers</p>
                      <p className="font-semibold">{data.correctAnswers}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Accuracy</span>
                      <span className="text-sm font-semibold">{data.averageAccuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{width: `${Math.max(1, parseFloat(data.averageAccuracy))}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recommendations</h3>
            
            {/* Progress Status */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-blue-900">Progress Status</span>
              </div>
              <p className="text-blue-800">{progressTrends.message}</p>
            </div>

            {/* Weak Areas */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Areas to Focus On</h4>
              <div className="space-y-2">
                {improvementAreas.weakSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-900">{subject.subject}</span>
                    <span className="text-sm text-red-700">{subject.accuracy}% accuracy</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Action Items</h4>
              <ul className="space-y-2">
                {improvementAreas.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-yellow-800 text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Tests Table */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Tests</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-gray-600 font-medium">Test ID</th>
                  <th className="pb-3 text-gray-600 font-medium">Type</th>
                  <th className="pb-3 text-gray-600 font-medium">Date</th>
                  <th className="pb-3 text-gray-600 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {recentTestsData.map((test) => (
                  <tr key={test.id} className="border-b last:border-b-0">
                    <td className="py-3 font-medium">#{test.id}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        test.type === 'fulltest' ? 'bg-green-100 text-green-800' :
                        test.type === 'meTest' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {test.type}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600">{test.date}</td>
                    <td className="py-3">
                      <span className="font-semibold text-gray-900">{test.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;