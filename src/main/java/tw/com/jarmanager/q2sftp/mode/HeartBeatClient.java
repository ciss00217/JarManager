package tw.com.jarmanager.q2sftp.mode;

import javax.xml.bind.annotation.XmlTransient;

public class HeartBeatClient {
	private String beatID;
	private String fileName;
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

	public String getBeatID() {
		return beatID;
	}

	public void setBeatID(String beatID) {
		this.beatID = beatID;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public long getTimeSeries() {
		return timeSeries;
	}

	public void setTimeSeries(long timeSeries) {
		this.timeSeries = timeSeries;
	}
}
