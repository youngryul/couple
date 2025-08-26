import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORS preflight request 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Supabase 클라이언트 생성
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 요청 본문 파싱
    const { type, record, table } = await req.json()

    // auth.users 테이블에 새 사용자가 추가되었을 때만 처리
    if (type === 'INSERT' && table === 'users') {
      const { id, email, user_metadata } = record

      // 가입창구 확인 (user_metadata에서 가져오거나 기본값 사용)
      const channel = user_metadata?.channel || 'WEB'

      // 프로필 테이블에 새 레코드 삽입
      const { data: profile, error } = await supabaseClient
        .from('profiles')
        .insert({
          id: id,
          user_id: id,
          user_email: email,
          username: `user_${Date.now()}`,
          channel: channel,
          user_name: user_metadata?.full_name || '',
          display_name: user_metadata?.full_name || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('프로필 생성 실패:', error)
        return new Response(
          JSON.stringify({ error: '프로필 생성 실패' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      console.log('프로필 자동 생성 성공:', profile)
      return new Response(
        JSON.stringify({ success: true, profile }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ message: '처리할 이벤트가 없습니다' }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('에러 발생:', error)
    return new Response(
      JSON.stringify({ error: '서버 에러' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
