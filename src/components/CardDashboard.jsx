export default function CardDashboard({ children, className = '', colSpan = 1, height = 'h-32' }) {
    return (
        <div
            className={`flex flex-col lg:flex-row lg:items-center lg:justify-between px-5 py-1 rounded-3xl shadow-sm border border-black ${height} ${colSpan === 2 ? 'col-span-2' : colSpan === 3 ? 'col-span-3' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
}