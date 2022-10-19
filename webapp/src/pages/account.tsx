import { useSession, signOut } from 'next-auth/react'

const Account = () => {
  const { data: session, status } = useSession({
    required: true
  });
  if (status === 'authenticated') {
    return (
      <div>
        <p>Welcome {session.user.name}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>
          you are not signed in.
        </p>
      </div>
    )
  }
}

export default Account
