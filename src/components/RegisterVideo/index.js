import React from 'react'
import { StyledRegisterVideo } from './styles'

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
