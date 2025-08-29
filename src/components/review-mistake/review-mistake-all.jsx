"use client"
import React from "react";
import { useParams } from "next/navigation";
export default function ReviewAllTestMistakes() {
    const params = useParams()
  const testType = params["test-type"]
  const testId = params["test-id"]
  return (
    <div>
      hello {testType}
      {testId}
    </div>
  );
}
