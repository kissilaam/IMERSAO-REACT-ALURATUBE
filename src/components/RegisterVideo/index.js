import React from 'react'
import { StyledRegisterVideo } from './styles'
import { createClient } from '@supabase/supabase-js'

//? custom hook
function useForm(formProps) {
	const [values, setValues] = React.useState(formProps.initialValues)

	return {
		values,
		handleChange: event => {
			const value = event.target.value
			const name = event.target.name
			setValues({
				...values,
				[name]: value
			})
		},
		clearForm() {
			setValues({})
		}
	}
}

const PROJECT_URL = 'https://bdwwzikfdsegyeiwlfvj.supabase.co'
const PUBLIC_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkd3d6aWtmZHNlZ3llaXdsZnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjM3MzgsImV4cCI6MTk4MzkzOTczOH0.bfCfqpvy32_tPAnZ1b9hO8mOotyltoQqhMMo7H0eNIg'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

// get outube thumbnail from video url
function getThumbnail(url) {
	return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`
}

// function getVideoId(url) {
// 	const videoId = url.split('v=')[1]
// 	const ampersandPosition = videoId.indexOf('&')
// 	if (ampersandPosition !== -1) {
// 		return videoId.substring(0, ampersandPosition)
// 	}
// 	return videoId
// }

export default function RegisterVideo() {
	const logForm = useForm({
		initialValues: { title: 'Frost punk', url: 'http://youtube.com' }
	})
	const [visibleForm, setVisibleForm] = React.useState(false)

	/*
    ! O que precisamos para o form funcionar?
    * pegar os dados, que precisam vir do state
        - titulo
        - url do vídeo 
    * precisamos ter um onSubmit do nosso form
    * limpar o formulário após o Submit
    */

	return (
		<StyledRegisterVideo>
			<button className="add-video" onClick={() => setVisibleForm(true)}>
				+
			</button>
			{visibleForm ? (
				<form
					onSubmit={event => {
						event.preventDefault()

						//? contract between frontend and backend
						supabase
							.from('video')
							.insert({
								title: logForm.values.title,
								url: logForm.values.url,
								thumb: getThumbnail(logForm.values.url),
								playlist: 'jogos'
							})
							.then(oqueveio => {
								console.log(oqueveio)
							})
							.catch(err => {
								console.log(err)
							})

						setVisibleForm(false)
						logForm.clearForm()
					}}
				>
					<div>
						<button type="button" className="close-modal" onClick={() => setVisibleForm(false)}>
							X
						</button>
						<input
							placeholder="Título do Vídeo"
							name="title"
							value={logForm.values.title}
							onChange={logForm.handleChange}
						/>
						<input
							placeholder="URL"
							name="url"
							value={logForm.values.url}
							onChange={logForm.handleChange}
						/>
						<button type="submit">Cadastrar</button>
					</div>
				</form>
			) : (
				false
			)}
		</StyledRegisterVideo>
	)
}
