import type { IRequest } from "../../interfaces/Requests/request.interface"
import RequestCard from "./RequestCard"

interface RequestsListProps {
  requests: IRequest[]
}

export default function RequestsList({ requests }: RequestsListProps) {
  return (
    <section className="requests-list">
      {requests.map((request: IRequest) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </section>
  )
}