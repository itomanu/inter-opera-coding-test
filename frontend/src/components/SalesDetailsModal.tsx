import { SalesRep } from "@/services/types"
import { SalesAvatar } from "./SalesAvatar"
import { SkillItem } from "./SkillsField"
import { DealsFieldItem } from "./DealsField"
import { formatCurrency } from "@/lib/utils"
import { ClientItem } from "./ClientsField"
import { Modal } from "./Modal"

export type SalesDetailsModalProps = {
  data: SalesRep
  isOpen: boolean
  onClose: () => void
}

export function SalesDetailsModal({
  data, isOpen, onClose
}: SalesDetailsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-3 flex-col">
        <div className="flex items-center gap-3">
          <SalesAvatar name={`${data.id}-${data.name}`} size={100} />
          <div>
            <p className="font-semibold text-gray-800 text-xl">
              {data.name}
            </p>
            <p className="text-gray-500">
              {data.role}
            </p>
            <p className="text-gray-500">
              {data.region}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-medium">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-1 text-sm">
            {data.skills.map((skill, i) => (
              <SkillItem key={i} text={skill} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-medium">Deals</h3>
          <table>
            <thead>
              <tr className="bg-gray-100 text-gray-400 uppercase">
                <th className="text-start font-medium p-2 text-xs">
                  Client
                </th>
                <th className="text-end font-medium p-2 text-xs">
                  Deal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.deals.map((deal, i) => (
                <tr key={i}>
                  <td className="p-2 py-1 text-sm">
                    {deal.client}
                  </td>
                  <td className="p-2 py-1">
                    <div className="flex justify-end text-sm">
                      <DealsFieldItem
                        text={formatCurrency(deal.value)}
                        type={deal.status}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-medium">Clients</h3>
          <div className="flex flex-col">
            {data.clients.map((client, i) => (
              <div key={i}>
                <div className="flex flex-row justify-between">
                  <div className="p-2 py-1 text-sm">
                    <div className="flex flex-row gap-1 items-center">
                      <ClientItem
                        background="random"
                        text={client.name.split(" ").map(s => s.charAt(0)).join("")} />
                      <div className="flex flex-col gap-1">
                        <p>{client.name}</p>
                        <p className="text-xs text-gray-500">{client.industry}</p>
                        <a
                          className="underline text-emerald-700 text-xs italic hover:text-emerald-900 inline-block sm:hidden"
                          href={`mailto:${client.contact}`}>{client.contact}</a>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 py-1 text-sm hidden sm:inline-block">
                    <a
                      className="underline text-emerald-700 italic hover:text-emerald-900"
                      href={`mailto:${client.contact}`}>{client.contact}</a>
                  </div>
                </div>
                {i < data.clients.length - 1 && (
                  <div className="h-px w-full bg-gray-200 my-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
