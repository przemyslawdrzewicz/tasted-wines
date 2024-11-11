import Layout from '@/components/layouts/Layout'
import Header from '@/components/ui/header/Header'
import SubHeader from '@/components/ui/subheader/SubHeader'
import WineForm from '@/components/wines/forms/WineForm'

const Add = () => {
  return (
    <Layout>
      <Header title="Add wine" />
      <SubHeader title="Share some wine" />
      <WineForm />
    </Layout>
  )
}

export default Add
