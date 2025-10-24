import {Link, Outlet} from "react-router";
import { BarChart3 } from 'lucide-react';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import Card from '../../components/Card.jsx';

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <Navbar title="Overview" />

                {/* Dashboard Content */}
                <div className="flex-1 p-6 overflow-auto">
                    {/* Top Row - 3 Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <Card height="h-[300px]" className="flex items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Daftar buwuhan<br />yang sudah lunas
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mt-4">0</p>
                            </div>
                        </Card>

                        <Card height="h-[300px]" className="flex items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Daftar buwuhan<br />yang belum lunas
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mt-4">0</p>
                            </div>
                        </Card>

                        <Card height="h-[300px]" className="flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-xs text-gray-600">Data Summary</p>
                            </div>
                        </Card>
                    </div>

                    {/* Bottom Row - Large Chart Card + Small Card */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card colSpan={2} height="h-[300px]" className="flex items-center justify-center">
                            <div className="text-center">
                                <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Chart Placeholder</p>
                            </div>
                        </Card>

                        <Card height="h-[300px]" className="flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-xs text-gray-600">Quick Stats</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
