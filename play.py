from playsound import playsound
import os, sys

dir_path = os.path.abspath('./src/assets/bells/' + sys.argv[1]).replace('\\', '/')
playsound(dir_path)