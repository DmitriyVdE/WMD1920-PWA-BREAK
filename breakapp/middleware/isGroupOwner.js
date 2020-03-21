export default function({ store, redirect }) {
  console.log("Auth check 'is group owner' 🔒")

  const currentUserId = store.state.auth.user?.id
  const isGroupOwner = store.state.group.currentGroup.owners.includes(
    currentUserId
  )

  // If the user is not a group owner
  if (!isGroupOwner) {
    return redirect('/')
  }
}
