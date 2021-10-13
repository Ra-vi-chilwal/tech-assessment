import React, { useState } from "react";
import "./App.css";

import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import CloseIcon from "./assets/CloseIcon.svg";
import { generateDownload } from "./utils/cropImage";
import { Container } from "@material-ui/core";

export default function App() {
	const inputRef = React.useRef();

	const triggerFileSelectPopup = () => inputRef.current.click();

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [state, setState] = useState(false);
	const uploadedImage = React.useRef(null);
	const imageUploader = React.useRef(null);
	function toggle() {
		setState(!state);
	}

	function handleImageUpload(e) {
		const [file] = e.target.files;
		if (file) {
			const reader = new FileReader();
			const { current } = uploadedImage;
			current.file = file;
			reader.onload = (e) => {
				current.src = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}
	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

	const onDownload = () => {
		generateDownload(image, croppedArea);
	};

	return (
		<div>
			<Container>
				<h3 className="pt-5" style={{ textAlign: "center" }}>
					<strong>Technical Skill Assessment</strong>
				</h3>

				<div class="card pt-5" style={{ width: "300px", height: "300px" }}>
					<div className="page">
						<div className="container">
							<div className="img-holder">
								<img
									src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
									alt=""
									id="img"
									className="img"
									ref={uploadedImage}
								/>
							</div>
							<input
								type="file"
								accept="image/*"
								name="image-upload"
								id="input"
								onChange={handleImageUpload}
								ref={imageUploader}
								className="close-icon"
								src={CloseIcon}
								alt="CloseIcon"
								//onChange={imageHandler}
							/>
							<div className="label">
								<Button
									type="file"
									accept="image/*"
									variant="contained"
									color="info"
									onClick={() => {
										toggle();
										imageUploader.current.click();
									}}
								>
									{state ? "Save" : "Edit"}
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="container pt-0">
					<div className="container-cropper">
						{image ? (
							<>
								<div className="cropper">
									<Cropper
										image={image}
										crop={crop}
										zoom={zoom}
										aspect={1}
										onCropChange={setCrop}
										onZoomChange={setZoom}
										onCropComplete={onCropComplete}
									/>
								</div>

								<div className="slider">
									<Slider
										min={1}
										max={3}
										step={0.1}
										value={zoom}
										onChange={(e, zoom) => setZoom(zoom)}
									/>
								</div>
							</>
						) : null}
					</div>
					<div
						style={{
							height: "300px",
							width: "600px",
							border: "1px dashed black",
							marginTop: "-300px",
							textAlign: "center",
						}}
					>
						<h1 className="pt-3">
							Hi ! <strong style={{ BackgroundColor: "black" }}>UNOIA</strong>
							TECH
						</h1>
						<p>Thanks for giving me opportunity</p>
						<input
							type="file"
							accept="image/*"
							ref={inputRef}
							onChange={onSelectFile}
							style={{ display: "none" }}
							className="close-icon"
							src={CloseIcon}
							alt="CloseIcon"
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={triggerFileSelectPopup}
							style={{ marginRight: "10px" }}
						>
							Edit
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={onDownload}
							style={{ marginRight: "10px" }}
						>
							Save Image
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
}
