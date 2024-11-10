import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import CaretCollapsible from '../../components/CaretCollapsible'
import { getUserInbox, getUserOutbox } from '../../lib/appwrite'
import MessageModal from '../../components/Modals/MessageModal'

const Messaging = () => {
  const { user, page } = useGlobalContext()
  const [selectedMessage, setSelectedMessage] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  // const [newMessages, setNewMessages] = useState(false)
  const { data: inbox, refetch } = useAppwrite(() => getUserInbox(user.$id))
  const { data: outbox } = useAppwrite(() => getUserOutbox(user.$id))

  return (
    <View style={{ flex: 1 }}>
      <Text>Messaging</Text>
      <CaretCollapsible text={`Inbox`} DropdownComponent={<Mailbox messages={inbox} setSelected={setSelectedMessage} setVisible={() => setModalVisible(true)} />} />
      <CaretCollapsible text={"Sent"} DropdownComponent={<Mailbox messages={outbox} />} />
      <MessageModal user={user} message={selectedMessage} visible={modalVisible} close={() => setModalVisible(false)} />
    </View>
  )
}

export default Messaging
