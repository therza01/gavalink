-- Create voice agent requests table
CREATE TABLE public.voice_agent_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  request_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT DEFAULT 'normal',
  officer_id UUID,
  officer_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.voice_agent_requests ENABLE ROW LEVEL SECURITY;

-- Citizens can view their own requests
CREATE POLICY "Users can view own voice requests"
ON public.voice_agent_requests
FOR SELECT
USING (auth.uid() = user_id);

-- Citizens can insert their own requests
CREATE POLICY "Users can insert own voice requests"
ON public.voice_agent_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Officers can view all requests
CREATE POLICY "Officers can view all voice requests"
ON public.voice_agent_requests
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid() AND profiles.profile_type = 'officer'
));

-- Officers can update requests (approve/reject)
CREATE POLICY "Officers can update voice requests"
ON public.voice_agent_requests
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid() AND profiles.profile_type = 'officer'
));

-- Enable realtime for voice requests
ALTER PUBLICATION supabase_realtime ADD TABLE public.voice_agent_requests;

-- Add trigger for updated_at
CREATE TRIGGER update_voice_agent_requests_updated_at
BEFORE UPDATE ON public.voice_agent_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();