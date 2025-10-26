export default function Card({ children, className = '', colSpan = 1, height = 'h-32' }) {
    return (
        <div
            className={`p-10 rounded-3xl shadow-sm border-2 border-black ${height} ${
                colSpan === 2 ? 'col-span-2' : colSpan === 3 ? 'col-span-3' : ''
            } ${className}`}
        >
            {children}
        </div>
    );
}