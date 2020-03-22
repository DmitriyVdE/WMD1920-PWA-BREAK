export default function({ store, redirect }) {
  // console.log("Auth check 'is group owner' 🔒")

  // If the user is not a group owner
  if (!store.state.group.currentGroup.isOwner) {
    return redirect('/')
  }
}
