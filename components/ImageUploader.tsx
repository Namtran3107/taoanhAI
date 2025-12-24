
import React from 'react';
import { ReferenceImage } from '../types';

interface Props {
  images: ReferenceImage[];
  onChange: (images: ReferenceImage[]) => void;
}

export const ImageUploader: React.FC<Props> = ({ images, onChange }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = 5 - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    const newImages: ReferenceImage[] = await Promise.all(
      filesToProcess.map((file) => {
        return new Promise<ReferenceImage>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              data: reader.result as string,
              mimeType: file.type,
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );

    onChange([...images, ...newImages]);
  };

  const removeImage = (id: string) => {
    onChange(images.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Visual References ({images.length}/5)</label>
        {images.length < 5 && (
          <label className="cursor-pointer text-xs font-medium text-black underline underline-offset-4 hover:opacity-70 transition-opacity">
            Upload
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      {images.length === 0 ? (
        <div className="h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-300 text-xs italic">
          Upload up to 5 reference images...
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-square">
              <img
                src={img.data}
                alt="Reference"
                className="w-full h-full object-cover rounded shadow-sm transition-transform group-hover:scale-95"
              />
              <button
                onClick={() => removeImage(img.id)}
                className="absolute -top-1 -right-1 bg-white shadow-md border border-gray-100 rounded-full w-5 h-5 flex items-center justify-center text-[10px] text-gray-500 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
