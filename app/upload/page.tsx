"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = (handleUpload) => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={270}
          alt="uppoaded image"
        />
      )}
      <CldUploadWidget
        onSuccess={(result) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
          handleUpload(info.public_id);
        }}
        uploadPreset="soPossible"
      >
        {({ open }) => {
          return (
            <button className="btn btn-primary" onClick={() => open()}>
              Upload Image
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
