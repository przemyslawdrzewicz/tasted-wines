import styles from './Upload.module.css'
import {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from 'react'
import { ValidationRule } from '@/interfaces/validation'
import { validateRules } from '@/utils/validation/global'
import Image from 'next/image'
import { WineImage } from '@/interfaces/wine'

type UploadChangeEvent = React.ChangeEvent<HTMLInputElement>

interface UploadRef {
  validate: () => boolean
}

interface UploadProps {
  rules?: ValidationRule[]
  value: WineImage | string | null
  onChange: (value: WineImage) => void
}

const fileToSrc = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = () => reject('There is a file error')
    reader.readAsDataURL(file)
  })

const Upload = forwardRef<UploadRef, UploadProps>(
  ({ rules = [], value, onChange }, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [imageSrc, setImageSrc] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])

    const openUpload = () => fileInputRef.current?.click()

    const validateUpload = () => {
      const errorMessages = validateRules(rules, value)
      setErrors(errorMessages)
      return !errorMessages.length
    }

    const onUploadChange = async (event: UploadChangeEvent) => {
      const file = event.target.files?.[0]
      if (!file) return

      const src = await fileToSrc(file)
      const image = { name: file.name, file }

      setImageSrc(src)
      onChange(image)
      validateUpload()
    }

    useImperativeHandle(ref, () => ({
      validate: () => validateUpload(),
    }))

    const renderButtonContent = () => {
      if (!imageSrc) return <div>UPLOAD PICTURE</div>
      return <Image src={imageSrc} alt="Wine" width={400} height={400} />
    }

    useEffect(() => {
      if (value && typeof value === 'string') setImageSrc(value)
    }, [])

    const errorUploadClass = errors.length ? 'errorBorder' : styles.normalBorder

    return (
      <div>
        <button
          className={`${styles.upload} ${errorUploadClass}`}
          onClick={openUpload}
        >
          {renderButtonContent()}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={onUploadChange}
        />
        <div className="error">{errors[0]}</div>
      </div>
    )
  }
)

Upload.displayName = 'Upload'

export default Upload
