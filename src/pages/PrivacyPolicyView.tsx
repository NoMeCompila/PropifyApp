import React from 'react';
import { ArrowLeft, Lock, ShieldCheck, Mail } from 'lucide-react';

interface PrivacyPolicyViewProps {
  onBack: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 md:pb-16 transition-colors duration-200">
      {/* Top Navigation Bar / Action */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacidad y Protección de Datos</span>
        </div>
      </div>

      {/* Main Document Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-10 shadow-sm transition-colors duration-200">
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Política de Privacidad – Propify
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
            Última actualización: Agosto de 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 mb-8">
          <p>
            En Propify nos comprometemos a proteger la privacidad y los datos personales de nuestros usuarios, cumpliendo con los más altos estándares de seguridad y las normativas de protección de datos aplicables (incluyendo la Ley N° 25.326 de Protección de los Datos Personales de la República Argentina y estándares homólogos de la región).
          </p>
        </div>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">1.</span> Datos que Recopilamos
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p>
              Al utilizar Propify, podemos recopilar y procesar los siguientes datos:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Información de Registro y Contacto:</strong> Nombre, apellido, correo electrónico, número de teléfono y tipo de usuario (comprador, propietario, agente/inmobiliaria).
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Información de Búsqueda y Preferencias:</strong> Tipos de propiedad consultados, rangos de precio, ubicaciones geográficas de interés y propiedades guardadas.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Datos Técnicos y de Navegación:</strong> Dirección IP, tipo de dispositivo, navegador, cookies y métricas de interacción con la aplicación web.
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">2.</span> Finalidad del Tratamiento de los Datos
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                Facilitar la comunicación y el contacto entre interesados y comercializadores de los inmuebles.
              </li>
              <li>
                Personalizar la experiencia de usuario y optimizar el motor de recomendaciones de propiedades.
              </li>
              <li>
                Enviar notificaciones sobre nuevos listados, cambios de precio o actualizaciones relevantes (las cuales el usuario puede desuscribir en cualquier momento).
              </li>
              <li>
                Garantizar la seguridad, prevenir fraudes y auditar la calidad de los avisos publicados.
              </li>
            </ol>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">3.</span> Compartición de Información con Terceros
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p>
              Propify no vende ni alquila datos personales a terceros. La información podrá compartirse únicamente en los siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Con el anunciante/propietario:</strong> Cuando enviás un formulario de consulta o solicitás una visita sobre un inmueble específico, tus datos de contacto básicos se transmiten al publicador para gestionar tu solicitud.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Proveedores de infraestructura tecnológica:</strong> Servicios de hosting, bases de datos y analítica que operan bajo estrictos acuerdos de confidencialidad.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Requerimiento Legal:</strong> Ante órdenes judiciales fundadas o autoridades regulatorias competentes.
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">4.</span> Derechos de Acceso, Rectificación, Actualización y Supresión (ARCO)
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p>
              El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita, así como solicitar su rectificación o eliminación de nuestras bases de datos enviando un correo a:{' '}
              <a
                href="mailto:soporte@propify-app.vercel.app"
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Mail className="w-4 h-4 inline" />
                soporte@propify-app.vercel.app
              </a>{' '}
              (o el canal de contacto designado).
            </p>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">5.</span> Cookies y Tecnologías Similares
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Utilizamos cookies y almacenamiento local (LocalStorage) para recordar sesiones iniciadas, conservar filtros de búsqueda y analizar el tráfico de la web. Podés configurar tu navegador para bloquear o eliminar cookies, aunque ciertas funcionalidades de la app podrían verse afectadas.
            </p>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 6 */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">6.</span> Seguridad de la Información
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Implementamos protocolos de seguridad estándar de la industria (cifrado SSL/TLS, restricciones de acceso y almacenamiento seguro) para evitar el acceso no autorizado, alteración o pérdida de los datos personales suministrados.
            </p>
          </div>
        </section>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Panel</span>
        </button>
      </div>
    </div>
  );
};
