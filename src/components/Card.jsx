export default function Card({ children, className = '', colSpan = 1, height = 'h-32' }) {
    return (
        <div
            className={`p-6 rounded-3xl shadow-sm border-2 border-black ${height} ${
                colSpan === 2 ? 'col-span-2' : ''
            } ${className}`}
        >
            {children}
        </div>
    );
}
