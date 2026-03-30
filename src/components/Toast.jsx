import { CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toasts } = useCart()
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className="toast-item">
          <CheckCircle size={15} style={{ color:'#C9A84C', flexShrink:0 }} />
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.85rem', color:'rgba(245,237,217,0.9)' }}>{t.message}</p>
        </div>
      ))}
    </div>
  )
}