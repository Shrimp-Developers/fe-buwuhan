import React from 'react';
import Card from './Card';

export default function StatCard({ title, lunas, belum, bgColor }) {
    return (
        <Card className={`${bgColor}`} height="auto">
            <p className="text-base font-bold mb-4 text-center text-gray-900 ">
                Total data <br />
                <span className="font-extrabold text-lg">{title}</span>
            </p>
            <div className="flex justify-center gap-3">
                <div className="bg-white text-center px-6 py-4 rounded-2xl shadow-sm border-2 border-black flex-1">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Lunas</p>
                    <p className="text-3xl font-extrabold text-black">{lunas}</p>
                </div>
                <div className="bg-white text-center px-6 py-4 rounded-2xl shadow-sm border-2 border-black flex-1">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Belum</p>
                    <p className="text-3xl font-extrabold text-black">{belum}</p>
                </div>
            </div>
        </Card>
    );
}
