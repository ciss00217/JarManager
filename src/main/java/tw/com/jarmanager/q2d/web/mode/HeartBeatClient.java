package tw.com.jarmanager.q2d.web.mode;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement(name = "HeartBeatClient")
public class HeartBeatClient {

	@XmlElement(name = "BeatID")
	private String beatID;
	@XmlElement(name = "FileName")
	private String fileName;
	@XmlElement(name = "TimeSeries")
	private long timeSeries;

	@XmlTransient
	private String jarFilePath;

	@XmlTransient
	public String getJarFilePath() {
		return jarFilePath;
	}

	public void setJarFilePath(String jarFilePath) {
		this.jarFilePath = jarFilePath;
	}

	@XmlTransient
	public String getBeatID() {
		return beatID;
	}

	public void setBeatID(String beatID) {
		this.beatID = beatID;
	}

	@XmlTransient
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@XmlTransient
	public long getTimeSeries() {
		return timeSeries;
	}

	public void setTimeSeries(long timeSeries) {
		this.timeSeries = timeSeries;
	}

}
