import { Text, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { deleteListing } from '../../lib/appwrite'

const DeleteListingButton = ({ listing, refetch, valid, deselectListing }) => {
    const deleteListingConfirm = () => {
        deleteListing(listing)
        deselectListing()
        refetch()
    }

    const prematureDeleteListing = () => {
        // prompt : "You are deleting a listing before the bid you have accepted for it has expired,
        // the person who placed the bid will be able to leave a review and this may negatively impact
        // your seller rating"
        deleteListingConfirm()
    }

    return (
        <Pressable onPress={valid ? () => deleteListingConfirm() : prematureDeleteListing()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
            <MaterialCommunityIcons name={valid ? 'delete' : 'delete-alert'} size={40} color={'#DC143C'} />
        </Pressable>
    )
}

export default DeleteListingButton
