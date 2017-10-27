package tw.com.jarmanager.home.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

	private final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = { "/","/home" }, method = RequestMethod.GET)
	public String home() {
		
		return "home";
	}
	
	@RequestMapping(value = "/q2w", method = RequestMethod.GET)
	public String q2w() {
		return "q2w";
	}

	@RequestMapping(value = "/q2d", method = RequestMethod.GET)
	public String q2d() {
		return "q2d";
	}

}