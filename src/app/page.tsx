'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isChairExpanded, setIsChairExpanded] = useState(false);

  // Form states
  const [studioName, setStudioName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [hasWebsite, setHasWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('barber_interested_clients')
        .insert([{
          studio_name: studioName,
          email,
          whatsapp,
          instagram,
          has_website: hasWebsite,
        }]);

      if (insertError) {
        throw new Error(insertError.message || 'Erro ao processar a solicitação.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = latest * videoRef.current.duration;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Lógica futura de scroll baseada em window.scrollY
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-white selection:bg-cyan-neon/30">
      {/* 1. Hero Section (A Revelação) */}
      <section className="relative min-h-[100vh] w-full grid grid-cols-1 lg:grid-cols-2 items-center px-5 lg:px-20 overflow-hidden border-b border-cyan-900/30 bg-[#0A0A0A]">
        {/* Coluna 1 - Lado Esquerdo (Copy & Conversão) */}
        <div className="relative z-20 flex flex-col items-start text-left w-full max-w-2xl pt-32 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-neon animate-pulse"></span>
              <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">SaaS Premium para Barbearias</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight mb-8 text-white">
              A primeira plataforma de gestão que a sua barbearia merece.
            </h1>

            {/* Micro-cards de impacto */}
            <div className="space-y-4 mb-10">
              <motion.div
                className="flex items-start gap-3 p-4 rounded-2xl bg-surface/60 border border-border/60 backdrop-blur-sm hover:border-cyan-neon/20 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-cyan-neon text-lg mt-0.5 shrink-0">🔹</span>
                <div>
                  <p className="text-sm lg:text-base text-white/90 font-medium leading-relaxed">
                    <strong className="text-white">Mantenha sua clientela em um só lugar:</strong>{' '}
                    Seus clientes se cadastram, agendam sozinhos e gerenciam os próprios horários. Autonomia total para o cliente final.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 p-4 rounded-2xl bg-surface/60 border border-border/60 backdrop-blur-sm hover:border-cyan-neon/20 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-cyan-neon text-lg mt-0.5 shrink-0">🔹</span>
                <div>
                  <p className="text-sm lg:text-base text-white/90 font-medium leading-relaxed">
                    <strong className="text-white">Deixe de perder dinheiro com imprevistos:</strong>{' '}
                    Teve uma falta ou mudou o horário? Comunique ou notifique toda a sua base de clientes com um único clique via WhatsApp e notificações diretas.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3 p-4 rounded-2xl bg-surface/60 border border-border/60 backdrop-blur-sm hover:border-green-neon/20 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-green-neon text-lg mt-0.5 shrink-0">🔹</span>
                <div>
                  <p className="text-sm lg:text-base text-white/90 font-medium leading-relaxed">
                    <strong className="text-white">Ganhe mais com o seu ambiente:</strong>{' '}
                    Cadeira vazia é prejuízo. Alugue seus espaços ociosos para profissionais autônomos por hora e aumente o faturamento.
                  </p>
                </div>
              </motion.div>
            </div>

            <button 
              onClick={() => document.getElementById('vip-form')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Ir para o formulário de lista de espera VIP"
              className="group relative px-8 py-4 bg-transparent rounded-xl font-semibold text-cyan-neon overflow-hidden cursor-pointer hover:brightness-110 transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-cyan-neon/20 group-hover:bg-cyan-neon/30 transition-colors"></div>
              <div className="absolute inset-0 border border-cyan-neon/50 rounded-xl group-hover:border-cyan-neon transition-colors glow-subtle"></div>
              <div className="absolute -inset-1 bg-cyan-neon/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2 tracking-wide">
                Garantir Acesso Antecipado
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>

        {/* Coluna 2 - Lado Direito (O Produto Showcase) */}
        {/* Desktop: Vídeo 3D | Mobile: Print estático de alta nitidez */}
        <motion.div
          className="hidden lg:flex relative z-10 items-center justify-center lg:justify-end mt-12 lg:mt-0 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut", duration: 1.2, delay: 0.5 }}
        >
          <video
            src="/assets/videos/hero-transition.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full max-w-[500px] object-contain mix-blend-screen pointer-events-none"
          />
        </motion.div>

        {/* Mobile: Imagem estática de alta nitidez como fallback do vídeo */}
        <motion.div
          className="flex lg:hidden relative z-10 items-center justify-center mt-8 mb-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-full max-w-[280px]">
            <div className="absolute -inset-4 bg-cyan-neon/10 rounded-3xl blur-2xl pointer-events-none"></div>
            <img
              src="/assets/frame_barberstack_1.png"
              alt="BarberStack - Dashboard do aplicativo"
              className="relative w-full object-contain rounded-2xl"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-gray-500 z-30"
        >
          <span className="text-[10px] uppercase tracking-widest mb-1">Descubra</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* 2. Seção de Features (Bento Grid de Produto) */}
      <section className="py-32 px-6 bg-background relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-neon/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Engenharia de precisão para a sua cadeira.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Construído para barbearias que buscam excelência, combinando design intuitivo com ferramentas poderosas de automação.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)] md:auto-rows-[320px]">
            {/* Card 1 */}
            <motion.div 
              tabIndex={0}
              aria-label="Recurso: Agenda Anti-Furo"
              className="col-span-1 md:col-span-2 row-span-1 rounded-3xl bg-surface border border-border p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-neon/30 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 p-32 bg-cyan-neon/5 blur-[100px] rounded-full group-hover:bg-cyan-neon/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-cyan-neon/10 border border-cyan-neon/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-cyan-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Agenda Anti-Furo</h3>
                <p className="text-gray-400 max-w-sm">
                  Acabe com as faltas cobrando um sinal de 50% via Pix no momento do agendamento. Cliente compromissado, agenda cheia.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              tabIndex={0}
              aria-label="Recurso: Gestão de Tropa"
              className="col-span-1 row-span-1 rounded-3xl bg-surface border border-border p-8 flex flex-col justify-between relative overflow-hidden group hover:border-green-neon/30 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="absolute bottom-0 left-0 p-32 bg-green-neon/5 blur-[100px] rounded-full group-hover:bg-green-neon/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-green-neon/10 border border-green-neon/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-green-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Gestão de Tropa</h3>
                <p className="text-gray-400 text-sm">
                  Acompanhe o status e as comissões da sua equipe em tempo real. Cada barbeiro com seu próprio acesso.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              tabIndex={0}
              aria-label="Recurso: Visão de Águia Financeira"
              className="col-span-1 md:col-span-3 row-span-1 rounded-3xl bg-surface border border-border p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group hover:border-cyan-neon/30 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 md:w-5/12 mb-6 md:mb-0">
                <div className="w-12 h-12 rounded-xl bg-cyan-neon/10 border border-cyan-neon/20 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-cyan-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Visão de Águia</h3>
                <p className="text-gray-400 pr-4">
                  Métricas financeiras do dia, ticket médio e serviços mais vendidos. Tome decisões baseadas em dados, não em achismos.
                </p>
              </div>
              <div className="relative z-10 md:w-7/12 h-64 bg-background/80 border border-border rounded-xl flex items-center justify-center backdrop-blur-sm overflow-hidden p-2">
                <img src="/assets/frame_barberstack_0.png" alt="Dashboard Financeiro" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity hover:scale-[1.02] duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Nova Seção: Monetização de Ambiente (Cadeira Sob Demanda) */}
      <section className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-neon/20 to-transparent"></div>
        {/* Ambient glow */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-green-neon/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-neon/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-neon/10 border border-green-neon/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-neon animate-pulse"></span>
              <span className="text-xs font-medium text-green-neon tracking-wide uppercase">Recurso Exclusivo</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 text-white">
              Seu espaço faturando 24/7.{' '}
              <br className="hidden md:block" />
              <span className="text-green-neon">Mesmo sem barbeiro fixo.</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              A dor de quem aluga um ponto comercial é ver uma cadeira vazia acumulando poeira porque o profissional tem dois empregos ou faltou. Transforme espaço ocioso em receita líquida.
            </p>
          </motion.div>

          {/* Card Expansível via Framer Motion - Storytelling Dinâmico */}
          <motion.div
            layout
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              layout
              className={`rounded-3xl bg-surface border transition-colors duration-300 overflow-hidden ${
                isChairExpanded ? 'border-green-neon/40 shadow-[0_0_40px_rgba(0,255,170,0.1)]' : 'border-border hover:border-green-neon/20'
              }`}
            >
              {/* Bloco visível (sempre visível) */}
              <button
                onClick={() => setIsChairExpanded(!isChairExpanded)}
                aria-expanded={isChairExpanded}
                aria-label="Expandir detalhes sobre cadeira sob demanda"
                className="w-full p-6 md:p-10 text-left cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-green-neon/10 border border-green-neon/20 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-green-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">Cadeira Sob Demanda</h3>
                    </div>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                      Diga adeus à cadeira vazia. Abra vagas sob demanda para barbeiros autônomos por quantas horas você quiser.
                    </p>
                  </div>
                  <motion.div
                    animate={{ 
                      rotate: isChairExpanded ? 180 : 0,
                      scale: isChairExpanded ? 1 : [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 0.3 },
                      scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                    }}
                    className="w-10 h-10 rounded-full bg-green-neon/10 border border-green-neon/20 flex items-center justify-center shrink-0 mt-1 group-hover:bg-green-neon/20 transition-colors"
                  >
                    <svg className="w-5 h-5 text-green-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Detalhes ao expandir */}
              <AnimatePresence>
                {isChairExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 md:px-10 md:pb-10 pt-0">
                      <div className="h-px bg-gradient-to-r from-transparent via-green-neon/30 to-transparent mb-8"></div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Passo 1 */}
                        <motion.div
                          className="flex items-start gap-4 p-5 rounded-2xl bg-background/60 border border-border/60"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-cyan-neon/10 border border-cyan-neon/20 flex items-center justify-center shrink-0 text-cyan-neon font-bold text-sm">
                            1
                          </div>
                          <div>
                            <p className="text-white font-semibold mb-1">Solicitação via App</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              Os barbeiros parceiros solicitam o espaço via aplicativo com cadastro completo e CPF verificado.
                            </p>
                          </div>
                        </motion.div>

                        {/* Passo 2 */}
                        <motion.div
                          className="flex items-start gap-4 p-5 rounded-2xl bg-background/60 border border-border/60"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-cyan-neon/10 border border-cyan-neon/20 flex items-center justify-center shrink-0 text-cyan-neon font-bold text-sm">
                            2
                          </div>
                          <div>
                            <p className="text-white font-semibold mb-1">Portfólio e Verificação</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              Cada profissional insere seu portfólio de cortes. Você visualiza a qualidade antes de aprovar.
                            </p>
                          </div>
                        </motion.div>

                        {/* Passo 3 */}
                        <motion.div
                          className="flex items-start gap-4 p-5 rounded-2xl bg-background/60 border border-border/60"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-green-neon/10 border border-green-neon/20 flex items-center justify-center shrink-0 text-green-neon font-bold text-sm">
                            3
                          </div>
                          <div>
                            <p className="text-white font-semibold mb-1">Aprovação em Segundos</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              Você analisa e aprova o corte em segundos. Sem burocracia, com controle absoluto.
                            </p>
                          </div>
                        </motion.div>

                        {/* Passo 4 */}
                        <motion.div
                          className="flex items-start gap-4 p-5 rounded-2xl bg-background/60 border border-border/60"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-green-neon/10 border border-green-neon/20 flex items-center justify-center shrink-0 text-green-neon font-bold text-sm">
                            4
                          </div>
                          <div>
                            <p className="text-white font-semibold mb-1">100% Segurança Jurídica</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              Termos de uso assinados digitalmente. Rastreabilidade total de cada operação na sua cadeira.
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Reforço de prova */}
                      <motion.div
                        className="mt-8 p-5 rounded-2xl bg-green-neon/5 border border-green-neon/15 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-green-neon font-semibold text-sm md:text-base">
                          💰 Controle absoluto de segurança — sem burocracia, com 100% de segurança jurídica.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Seção Interativa Scroll-Bound (Caos para Ordem) */}
      <section ref={sectionRef} className="relative h-[200vh] bg-background">
        <div className="w-full h-screen sticky top-0 overflow-hidden border-y border-border/50 flex flex-col items-center justify-center">
          <video
            ref={videoRef}
            src="/assets/videos/video_section_3_english.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Lembrete: processar o vídeo com FFMPEG (keyframe a cada frame) para máxima performance no scrub de scroll */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          <motion.div
            className="relative z-20 text-center px-6 max-w-3xl"
            style={{ opacity: textOpacity, y: textY, scale: textScale }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
              Do papel para o digital. <br />
              <span className="text-cyan-neon">Em segundos.</span>
            </h2>
            <p className="text-xl text-gray-400">
              Esqueça a prancheta bagunçada e os cadernos de fiado. <br className="hidden md:block" />
              O BarberStack traz a sua barbearia para o século 21.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. Seção Lead Capture (Bottom Form) */}
      <section id="vip-form" aria-label="Formulário de Lista de Espera VIP" className="py-32 px-6 bg-background relative overflow-hidden flex items-center justify-center min-h-[80vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-neon/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

        <motion.div 
          className="relative z-10 w-full max-w-lg bg-surface/80 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {isSuccess ? (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-green-neon/20 flex items-center justify-center mb-6 border border-green-neon/50 shadow-[0_0_30px_rgba(0,255,170,0.3)] animate-pulse">
                <svg className="w-10 h-10 text-green-neon drop-shadow-[0_0_8px_rgba(0,255,170,0.6)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Vaga garantida na Lista VIP!</h3>
              <p className="text-gray-400 leading-relaxed">Em breve entraremos em contato com as instruções de acesso antecipado.</p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Lista de Espera VIP</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  As vagas para o MVP são limitadas. Inscreva sua barbearia na lista VIP agora e garanta descontos exclusivos e vitalícios de pré-lançamento!
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleFormSubmit}>
                <div className="space-y-2">
                  <label htmlFor="studio" className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Nome do Estúdio</label>
                  <input
                    type="text"
                    id="studio"
                    value={studioName}
                    onChange={(e) => setStudioName(e.target.value)}
                    placeholder="Ex: Barbearia do Zé"
                    required
                    aria-label="Nome do seu estúdio ou barbearia"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-neon/50 focus:ring-1 focus:ring-cyan-neon/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Seu E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@barbearia.com"
                    required
                    aria-label="Seu endereço de e-mail"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-neon/50 focus:ring-1 focus:ring-cyan-neon/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">WhatsApp</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                    aria-label="Seu número de WhatsApp com DDD"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-neon/50 focus:ring-1 focus:ring-cyan-neon/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Instagram</label>
                  <input
                    type="text"
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@suabarbearia"
                    required
                    aria-label="Usuário do Instagram da sua barbearia"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-neon/50 focus:ring-1 focus:ring-cyan-neon/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="has_website" className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Já possui site próprio?</label>
                  <select
                    id="has_website"
                    value={hasWebsite}
                    onChange={(e) => setHasWebsite(e.target.value)}
                    required
                    aria-label="Informe se você já possui um site próprio"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-neon/50 focus:ring-1 focus:ring-cyan-neon/50 transition-all appearance-none cursor-pointer [&>option]:bg-[#0A0A0A] [&>option]:text-white"
                  >
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="sim">Sim, já possuo</option>
                    <option value="nao_redes">Não, utilizo apenas redes sociais</option>
                    <option value="nao_interesse">Não, mas tenho interesse em ter</option>
                  </select>
                </div>

                {error && (
                  <div className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  aria-label={isSubmitting ? "Enviando seus dados..." : "Entrar na Lista de Espera"}
                  className="w-full mt-8 py-4 bg-cyan-neon hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Garantindo vaga...' : 'Entrar na Lista de Espera'}
                </button>
              </form>
            </>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4 text-green-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Seus dados estão seguros e criptografados
          </div>
        </motion.div>
      </section>

      {/* Footer minimalista */}
      <footer className="border-t border-border py-8 text-center text-gray-600 text-sm bg-background">
        <p>© {new Date().getFullYear()} BarberStack. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
