import React from 'react';
import { ArrowLeft, FileText, ShieldCheck, Scale } from 'lucide-react';

interface TermsAndConditionsViewProps {
  onBack: () => void;
}

export const TermsAndConditionsView: React.FC<TermsAndConditionsViewProps> = ({ onBack }) => {
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
          <span>Documento Legal Oficial</span>
        </div>
      </div>

      {/* Main Document Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-10 shadow-sm transition-colors duration-200">
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Términos y Condiciones de Uso – Propify
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
            Última actualización: Agosto de 2026
          </p>
        </div>

        {/* Introduction */}
        <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 mb-8">
          <p>
            Bienvenido a Propify (en adelante, la "Plataforma" o "Propify"). Te pedimos que leas atentamente estos Términos y Condiciones antes de utilizar nuestros servicios web, aplicaciones móviles o herramientas asociadas. Al acceder, registrarte o interactuar con la Plataforma, aceptás quedar vinculado por estos términos. Si no estás de acuerdo con alguna disposición, deberás abstenerte de utilizar la Plataforma.
          </p>
        </div>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">1.</span> Naturaleza y Alcance del Servicio
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p>
              Propify es una plataforma tecnológica que facilita la publicación, búsqueda, visualización y gestión de inmuebles para operaciones de compra, venta, alquiler y desarrollo inmobiliario.
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              Salvo indicación expresa y documentada en contrario:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Propify no actúa como parte contratante, compradora, vendedora ni garante en las transacciones que los usuarios coordinen a través de la Plataforma.
              </li>
              <li>
                Las operaciones definitivas (tales como la firma de reservas, boletos de compraventa, contratos de locación o escrituras traslativas de dominio) se celebran exclusivamente entre las partes interesadas y/o a través de profesionales matriculados (martilleros, corredores inmobiliarios o escribanos/notarios públicos habilitados según la jurisdicción correspondiente).
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">2.</span> Registro de Usuario y Seguridad de la Cuenta
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <li>
              Para acceder a ciertas funcionalidades (como publicar propiedades, guardar favoritos o enviar consultas directas), el usuario puede requerir la creación de una cuenta.
            </li>
            <li>
              El usuario se compromete a brindar información veraz, exacta, actual y completa.
            </li>
            <li>
              La confidencialidad de las credenciales de acceso es responsabilidad exclusiva del usuario, debiendo notificar de inmediato a Propify ante cualquier uso no autorizado.
            </li>
          </ul>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">3.</span> Publicación de Inmuebles y Responsabilidad del Contenido
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p className="font-medium text-slate-800 dark:text-slate-200">
              Los usuarios o agentes que publiquen propiedades garantizan que:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                Cuentan con las autorizaciones, títulos o mandatos legales suficientes para ofrecer el inmueble en venta o alquiler.
              </li>
              <li>
                Los datos descriptivos, fotografías, planos, recorridos virtuales, valores monetarios y condiciones impositivas/expensas reflejan la realidad jurídica y física del inmueble.
              </li>
              <li>
                Propify se reserva el derecho de auditar, suspender, editar o dar de baja publicaciones que resulten engañosas, inexactas, que infrinjan derechos de propiedad intelectual de terceros o violen normativas vigentes.
              </li>
            </ol>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">4.</span> Tasaciones, Precios y Valores de Referencia
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Cualquier estimación de precios, calculadora de cuotas hipotecarias o valor metro cuadrado provisto por algoritmos de la Plataforma tiene carácter meramente orientativo y no constituye una tasación formal ni un compromiso comercial vinculante.
            </p>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">5.</span> Propiedad Intelectual
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Todos los derechos sobre el software, diseño de interfaz, bases de datos, marcas, logotipos y código fuente de Propify son de propiedad exclusiva de los titulares de la Plataforma o sus licenciantes, quedando prohibida su reproducción o ingeniería inversa sin autorización previa.
            </p>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">6.</span> Limitación de Responsabilidad
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            <p className="font-medium text-slate-800 dark:text-slate-200">
              Propify no se responsabiliza por:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                Vicios redhibitorios, defectos ocultos, gravámenes o contingencias dominiales/tributarias de los inmuebles publicados.
              </li>
              <li>
                El incumplimiento de acuerdos verbales o escritos pactados fuera de la Plataforma entre compradores, inquilinos, propietarios y comercializadores.
              </li>
              <li>
                Interrupciones temporales del servicio debidas a mantenimiento técnico o fallas de conectividad ajenas al control razonable de la Plataforma.
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">7.</span> Modificaciones a los Términos
          </h2>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Propify podrá actualizar estos Términos y Condiciones en cualquier momento. Los cambios sustanciales entrarán en vigor a partir de su publicación en el sitio web.
            </p>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 my-8" />

        {/* Section 8 */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              8. Ley Aplicable y Jurisdicción
            </h2>
          </div>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Estos Términos se rigen por las leyes de la República Argentina (o la legislación aplicable en la jurisdicción donde opere la entidad matriz). Toda controversia derivada del uso de la Plataforma será sometida a los tribunales ordinarios competentes, renunciando a cualquier otro fuero que pudiera corresponder.
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
