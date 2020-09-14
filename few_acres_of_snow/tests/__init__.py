"""Ensure project root is in search path."""
import os
import sys

THIS_FILE_DIR = os.path.dirname(os.path.realpath(__file__))
proj_root = os.path.join(THIS_FILE_DIR, '..', '..', )
sys.path.append(proj_root)
