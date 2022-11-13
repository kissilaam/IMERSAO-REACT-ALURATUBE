import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = 'https://bdwwzikfdsegyeiwlfvj.supabase.co'
const PUBLIC_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkd3d6aWtmZHNlZ3llaXdsZnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjM3MzgsImV4cCI6MTk4MzkzOTczOH0.bfCfqpvy32_tPAnZ1b9hO8mOotyltoQqhMMo7H0eNIg'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
	return {
		getAllVideos() {
			return supabase.from('video').select('*')
		}
	}
}
