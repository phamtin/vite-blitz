import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

/**
 *  This route "/" should only process data and redirect to "/home",
 *  don't know why!
 */
function Index() {
  window.location.replace('/home')
  return <></>
}
