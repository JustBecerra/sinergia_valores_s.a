const icon = new Proxy({"src":"/_astro/icon.CvGbDubJ.png","width":32,"height":32,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/icon.png";
							}
							
							return target[name];
						}
					});

export { icon as i };
