import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="text-center text-slate-500 mt-10 mb-5 opacity-60">
      <Link href="https://www.williandev.com">
        <h3>
          © 2023-{currentYear} Willian Robson, Inc. Todos os direitos reservados.
        </h3>
      </Link>
    </div>
  )
}
