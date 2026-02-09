import { X } from 'lucide-react';
import { useState } from 'react';

export default function DetailProfile({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: ''
    });
    const [previewImage, setPreviewImage] = useState('/image-dino.png');

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="absolute z-50 top-12 right-3">
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-xl w-64 p-4">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Form */}
                <form className="space-y-3 mt-2" onSubmit={handleSubmit}>
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C2BFF8] relative group">
                            <img
                                src={previewImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[10px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                Ubah
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div>
                        <label className="text-[10px] text-gray-600 mb-0.5 block">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-[#8A86D5] focus:border-[#8A86D5]"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] text-gray-600 mb-0.5 block">
                            Nama Pengguna
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-[#8A86D5] focus:border-[#8A86D5]"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] text-gray-600 mb-0.5 block">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-[11px] focus:outline-none focus:ring-1 focus:ring-[#8A86D5] focus:border-[#8A86D5]"
                        />
                    </div>

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-[#8A86D5] hover:bg-[#7975C9] text-white rounded-lg text-[11px] font-medium transition-colors"
                    >
                        Ubah Profile
                    </button>
                </form>
            </div>
        </div>
    );
}