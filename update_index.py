import os
import json
import logging

debug=0

logging.addLevelName(logging.INFO,"INFO ")
logging.basicConfig(force=True,level=logging.DEBUG, format='[%(levelname)s] %(message)s',
	datefmt='%Y-%d-%b %H:%M:%S')

def get_index():
    index={}

    for _path in os.listdir("小猫"):
        #遍历“小猫”文件夹，检查错误，获取目录。

        path=os.path.join("小猫",_path)

        if not os.path.isdir(path):
            #跳过非文件夹的路径
            continue

        logging.info("Checking %s ···"%path)

        if not os.path.exists(os.path.join(path,"info.json")):
            #如果没有info.json，报错
            raise FileNotFoundError("\"info.json\" is not found at %s"%path)

        with open(os.path.join(path,"info.json"),"r",encoding="utf8") as info_file:
            #打开info.json
            info=json.load(info_file)

        if not type(info)==dict:
            #格式不对，不是dict，报错
            raise Exception("Wrong format of \"info.json\". See ./README.md .")

        for key in ["author","img","license","description"]:
            if not key in info:
                #缺少键，报错
                raise KeyError("Key \"%s\" not found in \"info.json\"."%key)
                
            if not type(info[key])==str:
                #不是字符串，报错
                raise TypeError("Value of \"%s\" should be a string. (in \"info.json\")"%key)

        if len(info["description"])>100:
            raise Exception("Description is too long (more than 100 characters).")

        img_path=os.path.join(path,info["img"])
        if not (os.path.exists(img_path) and os.path.isfile(img_path)):
            #如果没有检测到图像文件，或者检测到的是文件夹，报错
            raise FileNotFoundError("Image file \"%s\" not found."%img_path)

        #注意，脚本并不会检测图像文件的格式是否正确，需要审核者自己检查

        logging.info("√")

        index[_path]=info#记录index
    
    return index

try:
    index=get_index()
except Exception as err:
    if debug:
        logging.error("",exc_info=err)
    else:
        logging.error("%s: %s"%(type(err).__name__,err))
else:
    logging.info("There are %d images in total."%len(index))

    with open("模板/template_cat_count.svg","r",encoding="utf8") as template_f:
        #读取svg模板
        template=template_f.read()
    
    logging.info("Writing \"cat_count.svg\" ···")

    with open("数据/cat_count.svg","w",encoding="utf8") as cat_count_f:
        #写入cat_count.svg
        cat_count_f.write(template.replace("{|CAT_COUNT|}",str(len(index))))

    logging.info("Writing \"index.json\" ···")
    with open("数据/index.json","w",encoding="utf8") as index_file:
        # 写入index.json
        json.dump(index,index_file,ensure_ascii=False,indent=4)
    logging.info("Index updated successfully. ")
finally:
    os.system("pause")