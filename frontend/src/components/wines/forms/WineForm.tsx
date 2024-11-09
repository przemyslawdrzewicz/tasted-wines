import Button from '@/components/ui/button/Button'
import Form from '@/components/ui/form/Form'
import Input from '@/components/ui/input/Input'
import Upload from '@/components/ui/upload/Upload'
import { useEffect, useRef, useState } from 'react'
import { requiredRule } from '@/utils/validation/rules'
import { fileToBase64 } from '@/utils/base64/base64'
import { Wine } from '@/interfaces/wine'

interface FormRef {
  validate: () => boolean
}

interface WineFormProps {
  edit?: Wine
}

const WineForm = ({ edit }: WineFormProps) => {
  const formRef = useRef<FormRef>(null)
  const [form, setForm] = useState<Wine>({
    id: '',
    name: '',
    year: '',
    grape: '',
    image: null,
  })

  const save = async () => {
    const isValidateForm = formRef.current?.validate()
    if (!isValidateForm) return

    let file
    if (form.image && typeof form.image === 'object')
      file = await fileToBase64(form.image.file)

    const newImage =
      typeof form.image === 'object' ? { ...form.image, file } : form.image

    const formData = { ...form, image: newImage }

    await fetch('/api/wines/', {
      method: !edit ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
  }

  useEffect(() => {
    if (edit) setForm(edit)
  }, [edit])

  if (edit && !form.id) return <div>Loading ...</div>

  return (
    <div>
      <div className="grid grid-cols-12 my-10">
        <div className="col-span-12">
          <Form ref={formRef}>
            <Upload
              rules={[requiredRule]}
              value={form.image}
              onChange={(image) => setForm({ ...form, image })}
            />
            <Input
              label="NAME"
              rules={[requiredRule]}
              value={form.name}
              onChange={(name) => setForm({ ...form, name })}
            />
            <Input
              label="YEAR"
              rules={[requiredRule]}
              value={form.year}
              onChange={(year) => setForm({ ...form, year })}
            />
            <Input
              label="GRAPE"
              rules={[requiredRule]}
              value={form.grape}
              onChange={(grape) => setForm({ ...form, grape })}
            />
            <Button
              variant="normal"
              color="rgba(200, 111, 111, 0.40)"
              onClick={save}
            >
              Save
            </Button>
            <Button variant="outlined" to="/">
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default WineForm
