"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = ({
  handleUpload,
}: {
  handleUpload: (arg0: string) => void;
}) => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={270}
          alt="uploaded image"
        />
      )}
      <CldUploadWidget
        onSuccess={(result) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
          handleUpload(result.info!.secure_url);
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
