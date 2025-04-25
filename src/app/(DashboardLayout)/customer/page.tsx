/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Activity, Heart, History, Pill, Plus, Stethoscope, User, Shield, Award, Calendar } from "lucide-react"
import { useUser } from "@/contexts/UserContext"

// Define TypeScript interfaces for our data
interface UserType {
  _id: string
  name: string
  email: string
  role: string
  status: string
}

interface UserContextType {
  user: UserType | null
  setUser: (user: UserType | null) => void
  setIsLoading: (isLoading: boolean) => void
}

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState<string>("overview")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, setUser } = useUser() as UserContextType

  // Simple date formatter
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Custom progress bar component with animation
  const ProgressBar = ({
    value,
    className,
    color = "mint",
  }: {
    value: number
    className?: string
    color?: "mint" | "emerald" | "rose" | "amber" | "sky"
  }) => {
    const colorMap = {
      mint: "bg-teal-500",
      emerald: "bg-emerald-500",
      rose: "bg-rose-500",
      amber: "bg-amber-500",
      sky: "bg-sky-500",
    }
    const initial = user?.name?.charAt(0).toUpperCase() || '?';

    return (
      <div className={`w-full bg-gray-200 rounded-full h-2.5 overflow-hidden ${className || ""}`}>
        <div
          className={`${colorMap[color]} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-8 space-y-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header Section with Gradient Background */}
        <div className="relative bg-gradient-to-r from-teal-600 to-emerald-500 rounded-xl p-6 shadow-lg text-white overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{user?.role || "Customer"} Profile</h1>
              <p className="text-teal-100">View and manage customer information and medical records</p>
            </div>
       
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Information Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
              <h2 className="text-lg font-semibold">Customer Information</h2>
              <p className="text-sm text-teal-100">Personal and contact details</p>
            </div>
            <div className="p-5 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-28 w-28 rounded-full bg-gray-200 overflow-hidden relative border-4 border-white shadow-lg">
                  <img
                    src="https://i.ibb.co.com/bjHjg9ft/Picsart-25-04-01-11-17-24-905.jpg"
                    alt="Customer"
                    className="h-full w-full object-cover"
                  />
                  
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">{user?.name || "John Doe"}</h2>
                  <p className="text-gray-600">{user?.email || "john.doe@example.com"}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Patient ID: {user?._id ? user._id.slice(0, 8) : "MED-10042"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${user?.status === "Active" ? "bg-teal-100 text-teal-800" : "bg-amber-100 text-amber-800"} font-medium`}
                >
                  {user?.status || "Active"}
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Personal Details</p>
                    <p className="text-xs text-gray-500">42 years • Male • A+ Blood Type</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Emergency Contact</p>
                    <p className="text-xs text-gray-500">Jhonkar • +1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Award className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Insurance</p>
                    <p className="text-xs text-gray-500">HealthGuard • Policy #: HG-987654321</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Next Appointment</p>
                    <p className="text-xs text-gray-500">May 15, 2025 • 10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {/* Custom Tabs */}
            <div className="w-full bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
              <div className="grid grid-cols-2 w-full border-b border-gray-200">
                {["overview", "history"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-teal-600 text-teal-600 bg-teal-50"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-5 space-y-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Vital Signs Card */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-rose-50 to-rose-100">
                          <h3 className="text-base font-medium flex items-center text-rose-700">
                            <Heart className="mr-2 h-5 w-5 text-rose-500" />
                            Vital Signs
                          </h3>
                        </div>
                        <div className="p-4">
                          <div className="space-y-5">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Blood Pressure</span>
                                <span className="font-medium text-gray-900">120/80 mmHg</span>
                              </div>
                              <ProgressBar value={75} color="rose" />
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Heart Rate</span>
                                <span className="font-medium text-gray-900">72 bpm</span>
                              </div>
                              <ProgressBar value={65} color="rose" />
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Oxygen Saturation</span>
                                <span className="font-medium text-gray-900">98%</span>
                              </div>
                              <ProgressBar value={98} color="rose" />
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Temperature</span>
                                <span className="font-medium text-gray-900">98.6°F (37°C)</span>
                              </div>
                              <ProgressBar value={50} color="rose" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Activity Card */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-emerald-100">
                          <h3 className="text-base font-medium flex items-center text-emerald-700">
                            <Activity className="mr-2 h-5 w-5 text-emerald-500" />
                            Recent Activity
                          </h3>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-1.5 bg-emerald-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Annual Physical Examination</p>
                                <p className="text-xs text-gray-500">2 days ago</p>
                              </div>
                            </div>

                            <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-1.5 bg-amber-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Prescription Refill</p>
                                <p className="text-xs text-gray-500">1 week ago</p>
                              </div>
                            </div>

                            <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-1.5 bg-rose-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Blood Test Results</p>
                                <p className="text-xs text-gray-500">2 weeks ago</p>
                              </div>
                            </div>

                            <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-1.5 bg-sky-500 rounded-full"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Vaccination</p>
                                <p className="text-xs text-gray-500">1 month ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Conditions Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-sky-100">
                        <h3 className="text-base font-medium flex items-center text-sky-700">
                          <Stethoscope className="mr-2 h-5 w-5 text-sky-500" />
                          Current Conditions
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                              <p className="text-sm font-medium text-gray-900">Hypertension</p>
                            </div>
                            <p className="text-xs text-gray-500">Diagnosed: Jan 2020</p>
                          </div>
                          <div className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                              <p className="text-sm font-medium text-gray-900">Type 2 Diabetes</p>
                            </div>
                            <p className="text-xs text-gray-500">Diagnosed: Mar 2019</p>
                          </div>
                          <div className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="h-2 w-2 rounded-full bg-sky-500"></div>
                              <p className="text-sm font-medium text-gray-900">Asthma</p>
                            </div>
                            <p className="text-xs text-gray-500">Diagnosed: Sep 2010</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Medications Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-violet-100">
                        <h3 className="text-base font-medium flex items-center text-violet-700">
                          <Pill className="mr-2 h-5 w-5 text-violet-500" />
                          Current Medications
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Lisinopril 10mg</p>
                              <p className="text-xs text-gray-500">1 tablet daily</p>
                            </div>
                            <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full font-medium">
                              For Hypertension
                            </span>
                          </div>

                          <div className="h-px bg-gray-200 w-full"></div>

                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Metformin 500mg</p>
                              <p className="text-xs text-gray-500">2 tablets daily with meals</p>
                            </div>
                            <span className="px-2 py-1 text-xs bg-rose-100 text-rose-800 rounded-full font-medium">
                              For Diabetes
                            </span>
                          </div>

                          <div className="h-px bg-gray-200 w-full"></div>

                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Albuterol Inhaler</p>
                              <p className="text-xs text-gray-500">As needed for asthma symptoms</p>
                            </div>
                            <span className="px-2 py-1 text-xs bg-sky-100 text-sky-800 rounded-full font-medium">
                              For Asthma
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* History Tab */}
                {activeTab === "history" && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                      <h3 className="text-lg font-medium flex items-center text-gray-800">
                        <History className="mr-2 h-5 w-5 text-gray-600" />
                        Medical History
                      </h3>
                      <p className="text-sm text-gray-500">Complete patient medical history and records</p>
                    </div>
                    <div className="p-5 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3 text-gray-800">Conditions</h3>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-900">Hypertension</h4>
                              <span className="px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full font-medium">
                                Active
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Diagnosed: January 15, 2020</p>
                            <p className="text-sm mt-2 text-gray-700">
                              Patient has been managing hypertension with medication and lifestyle changes. Blood
                              pressure generally well-controlled.
                            </p>
                          </div>

                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-900">Type 2 Diabetes</h4>
                              <span className="px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full font-medium">
                                Active
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Diagnosed: March 22, 2019</p>
                            <p className="text-sm mt-2 text-gray-700">
                              Patient maintains diabetes with oral medication. HbA1c levels have been stable around 6.8%
                              for the past year.
                            </p>
                          </div>

                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-900">Asthma</h4>
                              <span className="px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full font-medium">
                                Active
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Diagnosed: September 10, 2010</p>
                            <p className="text-sm mt-2 text-gray-700">
                              Mild asthma, well-controlled with rescue inhaler. Patient experiences occasional symptoms
                              during high pollen seasons.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-gray-200 w-full"></div>

                      <div>
                        <h3 className="text-lg font-medium mb-3 text-gray-800">Surgeries & Procedures</h3>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                            <h4 className="font-medium text-gray-900">Appendectomy</h4>
                            <p className="text-sm text-gray-500 mt-1">June 12, 2015</p>
                            <p className="text-sm mt-2 text-gray-700">
{/*                               Laparoscopic appendectomy performed at Memorial Hospital. No complications, full recovery.
 */}                            </p>
                          </div>

                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                            <h4 className="font-medium text-gray-900">Knee Arthroscopy</h4>
                            <p className="text-sm text-gray-500 mt-1">August 3, 2018</p>
                            <p className="text-sm mt-2 text-gray-700">
                              Right knee arthroscopy for meniscus repair. Patient completed physical therapy with good
                              outcomes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerPage
