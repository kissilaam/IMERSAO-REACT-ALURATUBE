import React from 'react'
import config from '../config.json'
import styled from 'styled-components'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'

import { videoService } from '../src/services/videoServices'

function HomePage() {
	const homepageStyles = {
		//backgroundColor: 'red'
	}

	const service = videoService()
	const [filterValue, setFilterValue] = React.useState('')
	const [playlists, setPlaylists] = React.useState({})
	// const playlists = {
	// 	jogos: []
	// }

	React.useEffect(() => {
		console.log('useEffect')
		service.getAllVideos().then(dados => {
			console.log(dados.data)
			// forma imutável
			const novasPlaylists = { ...playlists }
			dados.data.forEach(video => {
				if (!novasPlaylists[video.playlist]) {
					novasPlaylists[video.playlist] = []
				}
				novasPlaylists[video.playlist].push(video)
			})
			setPlaylists(novasPlaylists)
		})
	}, [])

	return (
		<>
			<div
				style={{
					homepageStyles
				}}
			>
				{/* Prop Drilling - pergura a application passando as propriedades uma por uma para outros componentes*/}
				<Menu filterValue={filterValue} setFilterValue={setFilterValue} />
				<Header />
				<Timeline searchValue={filterValue} playlists={config.playlists}>
					Conteúdo
				</Timeline>
			</div>
		</>
	)
}

export default HomePage

const StyledHeader = styled.div`
	background-color: ${({ theme }) => theme.backgroundLevel1};

	img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.user-info {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 16px 32px;
		gap: 16px;
	}
`

const StyledBanner = styled.div`
	background-size: cover;
	//background-image: url(${config.bg}); //? for when you have a global config
	background-image: url(${({ bg }) => bg}); //? for when you don't, and pass the bg as prop
	height: 230px;
`

function Header() {
	return (
		<StyledHeader>
			<StyledBanner bg={config.bg} />

			<section className="user-info">
				<img src={`https://github.com/${config.github}.png`} />
				<div>
					<h2>{config.name}</h2>
					<p>{config.job}</p>
				</div>
			</section>
		</StyledHeader>
	)
}

function Timeline({ searchValue, ...props }) {
	const playlistNames = Object.keys(props.playlists)

	//Statenent
	//Retorno por expressão

	return (
		<StyledTimeline>
			{playlistNames.map(playlistName => {
				const videos = props.playlists[playlistName]

				return (
					<section key={playlistName}>
						<h2>{playlistName}</h2>
						<div>
							{videos
								.filter(video => {
									const titleNormalized = video.title.toLowerCase()
									const searchValueNormalized = searchValue.toLowerCase()
									return titleNormalized.includes(searchValueNormalized)
								})
								.map(video => {
									return (
										<a key={video.url} href={video.url}>
											<img src={video.thumb} />
											<span>{video.title}</span>
										</a>
									)
								})}
						</div>
					</section>
				)
			})}
		</StyledTimeline>
	)
}
