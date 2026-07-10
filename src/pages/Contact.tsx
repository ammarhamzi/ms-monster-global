import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            {t.contact.title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">{t.contact.subtitle}</p>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-sm mt-8" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <motion.a
              href="https://maps.google.com/?q=No+31-G+Jalan+BBN+6/3B+Desa+Cempaka+Putra+Nilai+71800+Nilai+Negeri+Sembilan"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group sm:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1.5">{t.contact.address}</h3>
                  <p className="text-slate-600 leading-relaxed">{t.contact.addressDetail}</p>
                  <p className="mt-3 text-sm font-semibold text-green-600 inline-flex items-center gap-1">
                    Open in Google Maps <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="tel:+60126665658"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="w-12 h-12 bg-blue-50 flex items-center justify-center text-blue-600 rounded-xl mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{t.contact.phone}</h3>
              <p className="text-slate-600">+6012-666 5658</p>
              <p className="mt-3 text-sm font-semibold text-blue-600 inline-flex items-center gap-1">
                Call us <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </motion.a>

            <motion.a
              href="mailto:solehin@msmonsterglobal.com"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
            >
              <div className="w-12 h-12 bg-amber-50 flex items-center justify-center text-amber-600 rounded-xl mb-5 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{t.contact.email}</h3>
              <p className="text-slate-600 break-all">solehin@msmonsterglobal.com</p>
              <p className="mt-3 text-sm font-semibold text-amber-600 inline-flex items-center gap-1">
                Send an email <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </motion.a>

            <motion.a
              href="https://www.facebook.com/HqMonsterPerfume/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Monster Perfume Facebook page"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
            >
              <div className="w-12 h-12 bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] rounded-xl mb-5 group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Official Facebook</h3>
              <p className="text-slate-600">News, products, and promotions.</p>
              <p className="mt-3 text-sm font-semibold text-[#1877F2] inline-flex items-center gap-1">
                Visit our page <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </motion.a>

            <motion.a
              href="https://wa.me/60126665658"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with MS Monster Global on WhatsApp"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-400 transition-all"
            >
              <div className="w-12 h-12 bg-[#25D366]/10 flex items-center justify-center text-[#25D366] rounded-xl mb-5 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">WhatsApp</h3>
              <p className="text-slate-600">Fastest way to reach our team.</p>
              <p className="mt-3 text-sm font-semibold text-[#25D366] inline-flex items-center gap-1">
                Start a chat <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
