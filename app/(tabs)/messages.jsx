import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CaretCollapsible from '../../components/CaretCollapsible'
import { getUserInbox, getUserOutbox } from '../../lib/appwrite'
import MessageModal from '../../components/Modals/MessageModal'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '../../lib/useAppwrite'
import Mailbox from '../../components/Mailbox'

const Messaging = () => {
  const { user, page } = useGlobalContext()
  const [selectedMessage, setSelectedMessage] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  // const [newMessages, setNewMessages] = useState(false)
  const { data: inbox, refetch } = useAppwrite(() => getUserInbox(user.$id))
  const { data: outbox } = useAppwrite(() => getUserOutbox(user.$id))

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-primary p-1">
      <View className="mt-8">
        <CaretCollapsible text={`Inbox`} DropdownComponent={<Mailbox messages={inbox} setSelected={setSelectedMessage} setVisible={() => setModalVisible(true)} />} />
        <CaretCollapsible text={"Sent"} DropdownComponent={<Mailbox messages={outbox} setSelected={setSelectedMessage} setVisible={() => setModalVisible(true)} sent={true} />} />
        <MessageModal user={user} message={selectedMessage} visible={modalVisible} close={() => setModalVisible(false)} />
      </View>
    </SafeAreaView>
  )
}

export default Messaging
