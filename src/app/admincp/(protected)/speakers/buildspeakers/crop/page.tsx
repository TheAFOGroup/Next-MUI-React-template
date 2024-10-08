"use client"
import ImageCrop from '@/components/utils/ImageCrop/imageCrop';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';


const Page = () => {
  const [image, setImage] = useState<string | undefined>();
  const handleImageChange = useCallback((croppedImage: string) => {
    setImage(croppedImage);
  }, [])
  return (
    <div>
      <ImageCrop onChange={handleImageChange} aspectRatio={4 / 3} />
      <Image src={image as string} alt="Picture of the author" />
    </div>
  );
};

export default Page;