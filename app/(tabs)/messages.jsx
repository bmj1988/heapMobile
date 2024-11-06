import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import CaretCollapsible from '../../components/CaretCollapsible'

const Messaging = () => {
  const { user, page } = useGlobalContext()
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [newMessages, setNewMessages] = useState(false)
  // create this appwrite logic
  // const { data: userMessages, refetch } = useAppwrite(() => getUserMessages(user.$id))
  // ideally these would be returned separately from the backend with no heavy logic on the frontend
  // const inbox = userMessages.filter((message) => message.toId === user.$id)
  // const sentMessages = userMessages.filter((message) => message.fromId === user.$id)
  // this is just to show what we're going for, obviously this is overkill and I would want to stay away from a useEffect where possible
  // useEffect(() => {
  //   for (let message of inbox) {
  //     if (!message.read) {
  //       setNewMessages(true)
  //       return
  //     }
  //   }
  // }, [inbox])

  return (
    <View style={{ flex: 1 }}>
      <Text>Messaging</Text>
      {/* <CaretCollapsible text={`Inbox`} DropdownComponent={<Mailbox messages={receivedMessages} />} /> */}
      {/* <CaretCollapsible text={"Sent"} DropdownComponent={<Mailbox messages={sentMessages} />} /> */}

    </View>
  )
}

export default Messaging
