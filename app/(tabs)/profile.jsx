import { useGlobalContext } from '@/context/GlobalProvider'
import ProfileComponent from '../../components/ProfileComponent'

const Profile = () => {
  const { user, page } = useGlobalContext()

  return (
    <ProfileComponent user={user} />
  )
}

export default Profile
