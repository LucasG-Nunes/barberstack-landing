import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { z } from 'zod';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Apenas instanciar o supabase se a URL estiver presente para não estourar erro no build caso não tenha config
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

const leadSchema = z.object({
  studioName: z.string().min(2, 'O nome do estúdio deve ter no mínimo 2 caracteres.'),
  email: z.string().email('E-mail inválido.'),
  whatsapp: z.string().min(10, 'O WhatsApp deve ter no mínimo 10 caracteres.')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar payload
    const validatedData = leadSchema.parse(body);

    if (supabase) {
      // Inserir no Supabase
      const { error: dbError } = await supabase
        .from('waitlist_leads')
        .insert([
          {
            studio_name: validatedData.studioName,
            email: validatedData.email,
            whatsapp: validatedData.whatsapp,
          }
        ]);

      if (dbError) {
        console.error('Supabase error:', dbError);
        return NextResponse.json({ error: 'Erro ao cadastrar lead no banco de dados.' }, { status: 500 });
      }
    } else {
      console.warn('Supabase não configurado. Pulando inserção.');
    }

    // Enviar E-mail com Resend
    const emailHtml = `
      <div style="background-color: #0A0A0A; padding: 40px; font-family: sans-serif; color: #FFFFFF; text-align: center;">
        <h1 style="color: #00D2FF; margin-bottom: 20px;">BarberStack</h1>
        <h2 style="color: #FFFFFF;">Sua vaga na lista VIP do BarberStack está confirmada.</h2>
        <p style="color: #CCCCCC; font-size: 16px; margin-top: 30px;">
          Olá, equipe do <strong>${validatedData.studioName}</strong>!
        </p>
        <p style="color: #CCCCCC; font-size: 16px;">
          Em breve entraremos em contato através do WhatsApp (${validatedData.whatsapp}) com mais novidades sobre o acesso antecipado.
        </p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333333;">
          <p style="color: #666666; font-size: 12px;">© ${new Date().getFullYear()} BarberStack. Todos os direitos reservados.</p>
        </div>
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      const { error: emailError } = await resend.emails.send({
        from: 'BarberStack <onboarding@resend.dev>',
        to: [validatedData.email],
        subject: 'Acesso VIP Confirmado - BarberStack',
        html: emailHtml,
      });

      if (emailError) {
        console.error('Resend error:', emailError);
        return NextResponse.json({ error: 'Erro ao enviar o e-mail de confirmação.' }, { status: 500 });
      }
    } else {
      console.warn('Resend não configurado. Pulando envio de e-mail.');
    }

    return NextResponse.json({ success: true, message: 'Lead cadastrado com sucesso!' }, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
