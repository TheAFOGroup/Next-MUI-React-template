"use client"
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Modal from '@mui/material/Modal';

import { getOrientation } from 'get-orientation/browser'
import React, { useEffect, useState, memo } from 'react'
import Cropper from 'react-easy-crop'

import { getCroppedImg, getRotatedImage } from '@/components/utils/ImageCrop/canvasUtils'

//import { styles } from './styles'

interface ImageCropProps {
  onChange: (croppedImage: string) => void;
  aspectRatio: number;
}

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}

const ImageCrop: React.FC<ImageCropProps> = ({ onChange, aspectRatio }) => {
  const [imageSrc, setImageSrc] = useState<string>("")
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState<number | undefined>(0)
  const [zoom, setZoom] = useState<number | undefined>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number; }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [croppedImage, setCroppedImage] = useState<string | undefined>()
  const [modelOpen, setModelOpen] = useState<boolean>(false)
  const handleClose = () => setModelOpen(false);
  const handleOpen = () => setModelOpen(true);


  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  useEffect(() => {
    onChange(croppedImage ?? '');
  }, [croppedImage, onChange])

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation as number
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage || "")
      handleClose()
    } catch (e) {
      console.error(e)
    }
  }

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        }
      } catch (e) {
        console.warn('failed to detect the orientation')
      }

      setImageSrc(imageDataUrl)
      handleOpen()
    }
  }

  return (
    <div>
      <React.Fragment>
        <Modal open={modelOpen}
          onClose={handleClose}
          aria-labelledby="modal-crop"
          aria-describedby="modal-crop"
        >
          <div>
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'black', padding: '10px', backgroundColor: "white" }}>
              <div style={{ width: '80%', marginBottom: '20px' }}>
                <Typography variant="overline" style={{ marginBottom: '10px' }}>
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => setZoom(zoom as number)}
                />
              </div>
              <div style={{ width: '80%', marginBottom: '20px' }}>
                <Typography variant="overline" style={{ marginBottom: '10px' }}>
                  Rotation
                </Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  onChange={(e, rotation) => setRotation(rotation as number)}
                />
              </div>
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Show Result
              </Button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
      <input type="file" onChange={onFileChange} accept="image/*" />
    </div >
  )
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result as string), false)
    reader.readAsDataURL(file)
  })
}

export default memo(ImageCrop)
