import React from 'react'

import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const ResumeResults = ({results}) => {
//     const dummyResult = {
//            match_score: 60,
//   matched: ["php", "laravel"],
//   missing: ["python"],
//   suggestions: ["docker", "kubernetes", "aws"],
//     }

    const { match_score, matched, missing, suggestions } = results
    console.log("Results from resumeresults: ", results)
    
    // Data for bar chart: counts of matched, missing, suggestions
    const barData = {
        labels: ["Matched", "Missing", "Suggestions"],
        datasets: [
        {
            label: "Count",
            data: [matched.length, missing.length, suggestions.length],
            backgroundColor: ["#3b82f6", "#ef4444", "#fbbf24"], // blue, red, yellow
        },
        ],
    };

    // Data for doughnut chart: matched vs others
    const doughnutData = {
        labels: ["Matched", "Unmatched"],
        datasets: [
        {
            data: [matched.length, missing.length],
            backgroundColor: ["#3b82f6", "#d1d5db"], // blue, gray
        },
        ],
    };


  return (
   <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Match Score</h2>

      {/* Progress Bar for match_score */}
      <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
        <div
          className="bg-blue-500 h-6 transition-all"
          style={{ width: `${match_score}%` }}
        />
      </div>
      <p className="text-center mt-1 font-medium">{match_score}%</p>

      <div className="card bg-base-200 shadow-md rounded-xl p-6 flex items-center justify-center min-h-40 text-black-500 italic">
               <h1 className="text-2xl font-bold mb-4">Suggestions</h1><ul>
      {results.suggestions.map((tip, index) => (
        <li key={index}>{tip}</li>
      ))}
    </ul>
            </div>

      {/* Bar chart */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Counts of Tags</h3>
        <Bar data={barData} />
      </div>

      {/* Doughnut chart */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Matched vs Others</h3>
        <Doughnut data={doughnutData} />
      </div>
    </div>
  )
}

export default ResumeResults