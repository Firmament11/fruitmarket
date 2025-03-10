package com.lianwei.lssg.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
         * 关于java.util.Date、java.sql.Timestamp和String之间的互相转换的方法
         * @Description: TODO
         * @CreateTime: 2017年10月25日 下午3:20:44
         * @version V1.0
         */
           public class DateUtils {
               /**
                * 将String字符串转换为java.util.Date格式日期
                *
                * @param strDate
                *            表示日期的字符串
                * @param dateFormat
                *            传入字符串的日期表示格式（如："yyyy-MM-dd HH:mm:ss"）
                * @return java.util.Date类型日期对象（如果转换失败则返回null）
                */
              public static Date strToUtilDate(String strDate, String dateFormat) {
                 SimpleDateFormat sf = new SimpleDateFormat(dateFormat);
                 Date date = null;
                 try {
                        date = sf.parse(strDate);
                     } catch (ParseException e) {
                         e.printStackTrace();
                     }
                 return date;
            }

             /**
              * 将String字符串转换为java.sql.Timestamp格式日期,用于数据库保存
              *
              * @param strDate
              *            表示日期的字符串
              * @param dateFormat
              *            传入字符串的日期表示格式（如："yyyy-MM-dd HH:mm:ss"）
              * @return java.sql.Timestamp类型日期对象（如果转换失败则返回null）
             */
              public static java.sql.Timestamp strToSqlDate(String strDate, String dateFormat) {
                 SimpleDateFormat sf = new SimpleDateFormat(dateFormat);
                 Date date = null;
                 try {
                         date = sf.parse(strDate);
        } catch (ParseException e) {
                         e.printStackTrace();
                     }
                java.sql.Timestamp dateSQL = new java.sql.Timestamp(date.getTime());
                 return dateSQL;
             }

              /**
         * 将java.util.Date对象转化为String字符串
         *
         * @param date
         *            要格式的java.util.Date对象
         * @param strFormat
         *            输出的String字符串格式的限定（如："yyyy-MM-dd HH:mm:ss"）
         * @return 表示日期的字符串
         */
              public static String dateToStr(Date date, String strFormat) {
                 SimpleDateFormat sf = new SimpleDateFormat(strFormat);
                 String str = sf.format(date);
                 return str;
            }

              /**
         * 将java.sql.Timestamp对象转化为String字符串
        *
          * @param time
         *            要格式的java.sql.Timestamp对象
          * @param strFormat
         *            输出的String字符串格式的限定（如："yyyy-MM-dd HH:mm:ss"）
         * @return 表示日期的字符串
          */
             public static String dateToStr(java.sql.Timestamp time, String strFormat) {
                 DateFormat df = new SimpleDateFormat(strFormat);
                 String str = df.format(time);
                 return str;
             }

              /**
        * 将java.sql.Timestamp对象转化为java.util.Date对象
         *
         * @param time
         *            要转化的java.sql.Timestamp对象
         * @return 转化后的java.util.Date对象
         */
              public static Date timeToDate(java.sql.Timestamp time) {
                 return time;
         }
            /**
             * 将java.util.Date对象转化为java.sql.Timestamp对象
             *
             * @param date
             *            要转化的java.util.Date对象
             * @return 转化后的java.sql.Timestamp对象
             */
              public static java.sql.Timestamp dateToTime(Date date) {
                 String strDate = dateToStr(date, "yyyy-MM-dd HH:mm:ss SSS");
                 return strToSqlDate(strDate, "yyyy-MM-dd HH:mm:ss SSS");
             }

             /**
              * 返回表示系统当前时间的java.util.Date对象
              * @return  返回表示系统当前时间的java.util.Date对象
              */
             public static Date nowDate(){
                 return new Date();
             }

          /**
          * 返回表示系统当前时间的java.sql.Timestamp对象
          * @return  返回表示系统当前时间的java.sql.Timestamp对象
          */
            public static java.sql.Timestamp nowTime(){
                 return dateToTime(new Date());
             }

             /*public static void main(String[] args) {
                 Date date = new Date();
                 System.out.println(DateUtils.dateToTime(date));
                 String time = String.valueOf(DateUtils.timeToDate(DateUtils.dateToTime(date)));
                 System.out.println(time);

                 System.out.println(DateUtils.nowTime());
             }*/
 }