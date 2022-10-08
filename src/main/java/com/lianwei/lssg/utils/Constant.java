package com.lianwei.lssg.utils;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.apache.http.entity.ContentType;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * author 太阳的光
 * time 2018-06
 * 文件的上传其实我遇到了好几个问题，
 * 因为项目是部署在tomcat里面，可是部署后，每次重启可能刷掉我本来上传好的图片
 * 为了防止这种事情，我必须将图片也传到本项目的文件夹中，没办法。
 */
public class Constant {


    public static final String FILEUPLOAD_PATH = "F:\\WorkSpaces\\IdeaProjects\\mall\\SSM\\Mall_2019\\src\\main\\webapp\\uploadfiles\\";
    public static final String FILEUPLOAD_PATH_For_Show = System.getProperty("user.dir");

    public static Map FileUploadUtils(HttpServletRequest request, MultipartFile file , String dir) throws IOException {
        // 图片新名字
        String name = UUID.randomUUID().toString();
        // 图片原名字
        String oldName = file.getOriginalFilename();
        // 后缀名
        String exeName = oldName.substring(oldName.lastIndexOf("."));
        //上传路径 //这里会获取项目部署tomcat的文件夹路径
        String path =request.getSession().getServletContext().getRealPath("uploadfiles/"+dir);
        //此路径其实也应该一起放进去，因为上传到本地的同时也应该上传到tomcat的部署文件中
        File uploadFiles = new File(path);
        if (!uploadFiles.exists()){
            uploadFiles.mkdir();
        }
        File pic = new File(uploadFiles +"\\" + name + exeName);
        // 保存图片到本地磁盘
        file.transferTo(pic);
        createMultipartFileByPath(uploadFiles+"\\" + name + exeName,dir);
        Map map=new HashMap();
        map.put("path1", name + exeName);
        return map;
    }

    /**
     * 这里是将本来上传到tomcat服务器文件夹的文件，重新获取，然后上传
     * 到项目的webapp中，由于系统的不稳定，项目重启有时会导致部署后文件清空会从项目webapp中
     * 重新上传，这里是为了避免上述情况做的调整。
     * @param path
     * @param dri
     * @throws IOException
     */
    public static void createMultipartFileByPath(String path, String dri) throws IOException {
        MultipartFile mFile = null;
        try {
            File file = new File(path);
            FileInputStream fileInputStream = new FileInputStream(file);
            String fileName = file.getName();
            fileName = fileName.substring((fileName.lastIndexOf("/") + 1));
            mFile = new MockMultipartFile(fileName, fileName,
                    ContentType.APPLICATION_OCTET_STREAM.toString(), fileInputStream);
        } catch (Exception e) {
            //Log.error("封装文件出现错误：{}", e);
            e.printStackTrace();
        }
        String path_to_tomcat = FILEUPLOAD_PATH+dri;
        File File_Path_to_tomcat = new File(path_to_tomcat);
        if (!File_Path_to_tomcat.exists()){
            File_Path_to_tomcat.mkdir();
        }
        int index = path.lastIndexOf("\\")+1;
        File pic = new File(path_to_tomcat+"/"+path.substring(index));
        mFile.transferTo(pic);
    }
}