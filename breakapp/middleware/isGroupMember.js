export default function({ store, redirect }) {
  console.log("Auth check 'is group member' 🔒")

  const currentUserId = store.state.auth.user?.id
  const isGroupMember = store.state.group.currentGroup.users.includes(
    currentUserId
  )

  // If the user is not a group member
  if (!isGroupMember) {
    return redirect('/')
  }
}
